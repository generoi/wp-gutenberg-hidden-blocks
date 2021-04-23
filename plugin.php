<?php
/*
Plugin Name:        Gutenberg Hidden Blocks
Plugin URI:         http://genero.fi
Description:        Adds a block setting for specifying screen specific visibility
Version:            1.0.0
Author:             Genero
Author URI:         http://genero.fi/
License:            MIT License
License URI:        http://opensource.org/licenses/MIT
*/
namespace GeneroWP\HiddenBlocks;

if (!defined('ABSPATH')) {
    exit;
}

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
}

class Plugin
{
    protected static $instance;

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    public function __construct()
    {
        add_action('plugins_loaded', [$this, 'init']);
    }

    public function assetUrl(string $asset): string
    {
        $manifest = json_decode(file_get_contents(__DIR__ . '/mix-manifest.json'), true);
        return plugins_url($manifest[$asset], __FILE__);
    }

    public function init()
    {
        if (!is_admin()) {
            add_action('enqueue_block_assets', [$this, 'blockAssets'], 0);
        }
        add_action('enqueue_block_editor_assets', [$this, 'blockEditorAssets'], 0);
    }

    public function blockAssets()
    {
        wp_enqueue_style(
            'wp-gutenberg-hidden-blocks/frontend.css',
            $this->assetUrl('/dist/frontend.css'),
            [],
            null
        );
    }

    public function blockEditorAssets()
    {
        if ($manifest = include __DIR__ . '/dist/editor.asset.php') {
            wp_enqueue_style(
                'wp-gutenberg-hidden-blocks/editor.css',
                $this->assetUrl('/dist/editor.css'),
                ['wp-edit-blocks', 'common'],
                null
            );
            wp_enqueue_script(
                'wp-gutenberg-hidden-blocks/editor.js',
                $this->assetUrl('/dist/editor.js'),
                $manifest['dependencies'],
                null
            );
        }
    }
}

Plugin::getInstance();
