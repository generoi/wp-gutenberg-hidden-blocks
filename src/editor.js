import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
// import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { Button, ButtonGroup, BaseControl } from '@wordpress/components';
import { mobile, tablet, desktop } from '@wordpress/icons';

function isBlockSupported(blockType) {
  return blockType || true;
}

const SCREEN_SIZES = [
  { name: 'mobile', label: 'Mobile', icon: mobile },
  { name: 'tablet', label: 'Tablet', icon: tablet },
  { name: 'desktop', label: 'Desktop', icon: desktop },
];

function addAttribute(settings) {
  if (isBlockSupported(settings.name)) {
    settings.attributes = {
      ...settings.attributes,
      hideFrom: {
        type: 'string',
      },
      showFrom: {
        type: 'string',
      },
    };
  }

  return settings;
}

const withDataAttributes = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const { name, attributes } = props;
    const hasHiddenAttributes = attributes.showFrom || attributes.hideFrom;

    if (isBlockSupported(name) && hasHiddenAttributes) {
      let wrapperProps = props.wrapperProps;
      wrapperProps = {
        ...wrapperProps,
        'data-show-from': attributes.showFrom,
        'data-hide-from': attributes.hideFrom,
      };

      return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
    }
    return <BlockListBlock { ...props } />;
  };
});

const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (isBlockSupported(props.name) && props.isSelected) {

      return (
        <>
          <BlockEdit { ...props } />
          <InspectorAdvancedControls>
            <BaseControl id="show-from" label={ __('Show from screen and larger') }>
              <div>
                <ButtonGroup>
                  { SCREEN_SIZES.map(({name, label, icon}) => {
                    return (
                      <Button
                        icon={ icon }
                        label={ label }
                        isSecondary
                        isSmall
                        isPressed={ props.attributes.showFrom === name }
                        onClick={ () => props.setAttributes({
                          showFrom: props.attributes.showFrom !== name ? name : undefined
                        }) }
                      />
                    );
                  }) }
                </ButtonGroup>
              </div>
            </BaseControl>
            <BaseControl id="hide-from" label={ __('Hide from screen and larger') }>
              <div>
                <ButtonGroup>
                  { SCREEN_SIZES.map(({name, label, icon}) => {
                    return (
                      <Button
                        icon={ icon }
                        label={ label }
                        isSecondary
                        isSmall
                        isPressed={ props.attributes.hideFrom === name }
                        onClick={ () => props.setAttributes({
                          hideFrom: props.attributes.hideFrom !== name ? name : undefined
                        }) }
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
  if (isBlockSupported(blockType)) {
    extraProps['data-show-from'] = attributes.showFrom || null;
    extraProps['data-hide-from'] = attributes.hideFrom || null;
  }

  return extraProps;
}

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
