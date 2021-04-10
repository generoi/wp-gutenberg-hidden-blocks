import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { Button, ButtonGroup, BaseControl } from '@wordpress/components';
import { mobile, tablet, desktop } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { useState } from '@wordpress/element';

function isBlockSupported(blockType) {
  // Just default to whatever blocks support custom class names (most).
  return hasBlockSupport(blockType, 'customClassName', true);
}

const DEFAULT_SCREEN_SIZES = [
  { name: 'mobile', label: 'Mobile', icon: mobile },
  { name: 'tablet', label: 'Tablet', icon: tablet },
  { name: 'desktop', label: 'Desktop', icon: desktop },
];

function addAttribute(settings) {
  if (isBlockSupported(settings.name)) {
    settings.attributes = {
      ...settings.attributes,
      hideOn: {
        type: 'array',
        items: {
          type: 'string',
        },
        default: [],
      },
    };
  }

  return settings;
}

const withDataAttributes = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const { name, attributes } = props;

    if (isBlockSupported(name) && attributes.hideOn.length) {
      let wrapperProps = props.wrapperProps;
      wrapperProps = {
        ...wrapperProps,
        'data-hide-on': attributes.hideOn.join(' '),
      };

      return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
    }
    return <BlockListBlock { ...props } />;
  };
});

const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (isBlockSupported(props.name) && props.isSelected) {
      const screenSizes = applyFilters('wp-gutenberg-hidden-blocks.screenSizes', DEFAULT_SCREEN_SIZES);

      return (
        <>
          <BlockEdit { ...props } />
          <InspectorAdvancedControls>
            <BaseControl id="hide-on" label={ __('Hide on screens') }>
              <div>
                <ButtonGroup>
                  { screenSizes.map(({name, label, icon}) => {
                    const onClick = () => {
                        const hideOn = props.attributes.hideOn;

                        props.setAttributes({
                          hideOn: hideOn.includes(name)
                            ? hideOn.filter((screen) => screen !== name)
                            : hideOn.concat([name]),
                        });
                    };

                    return (
                      <Button
                        icon={ icon }
                        label={ label }
                        isSecondary
                        isSmall
                        isPressed={ props.attributes.hideOn.includes(name) }
                        onClick={ onClick }
                      />
                    );
                  }) }
                </ButtonGroup>
              </div>
            </BaseControl>
          </InspectorAdvancedControls>
        </>
      );
    }
    return <BlockEdit { ...props } />;
  };
}, 'withInspectorControl');

function addSaveProps(extraProps, blockType, attributes) {
  if (isBlockSupported(blockType) && attributes.hideOn.length) {
    extraProps['data-hide-on'] = attributes.hideOn.join(' ');
  }

  return extraProps;
}

const HiddenBlocksMenuItem = () => {
  const [isPreviewing, setIsPreviewing ] = useState(false);

  return (
    <PluginMoreMenuItem
      icon={ mobile }
      onClick={ () => {
        if (isPreviewing) {
          delete document.body.dataset.previewHiddenBlocks;
          setIsPreviewing(false);
        } else {
          document.body.dataset.previewHiddenBlocks = 'true';
          setIsPreviewing(true);
        }
      } }
    >
      { isPreviewing ? __('Show all hidden blocks') : __('Preview hiding screen specific blocks') }
    </PluginMoreMenuItem>
  );
};

registerPlugin('wp-gutenberg-hidden-blocks', { render: HiddenBlocksMenuItem });

addFilter(
  'blocks.registerBlockType',
  'wp-gutenberg-hidden-blocks/attribute',
  addAttribute
);
addFilter(
  'editor.BlockListBlock',
  'wp-gutenberg-hidden-blocks/with-data-attributes',
  withDataAttributes
);
addFilter(
  'editor.BlockEdit',
  'wp-gutenberg-hidden-blocks/with-inspector-control',
  withInspectorControl
);
addFilter(
  'blocks.getSaveContent.extraProps',
  'wp-gutenberg-hidden-blocks/save-props',
  addSaveProps
);
