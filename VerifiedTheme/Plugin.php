<?php

namespace Kanboard\Plugin\VerifiedTheme;

use Kanboard\Core\Plugin\Base;

/**
 * Verified Hostings theme for Kanboard.
 *
 * Registers a single branded stylesheet through the layout CSS hook and a
 * small self-contained demo-CTA script through the layout JS hook
 * (dismissible "Get yours on Verified Hostings" bar, persisted in
 * localStorage). No templates are overridden.
 */
class Plugin extends Base
{
    public function initialize()
    {
        $this->hook->on('template:layout:css', array(
            'template' => 'plugins/VerifiedTheme/Assets/css/verified.css',
        ));
        $this->hook->on('template:layout:js', array(
            'template' => 'plugins/VerifiedTheme/Assets/js/banner.js',
        ));
    }

    public function getPluginName()
    {
        return 'Verified Theme';
    }

    public function getPluginDescription()
    {
        return 'Verified Hostings brand skin: forest header, purple accents, Inter/Fraunces type.';
    }

    public function getPluginAuthor()
    {
        return 'Verified Hostings';
    }

    public function getPluginVersion()
    {
        return '1.1.0';
    }

    public function getPluginHomepage()
    {
        return 'https://verifiedhostings.com';
    }
}
