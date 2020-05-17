import { Injectable } from '@angular/core';
import { InterfaceConfig } from '../interface-config/config.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public interfaceConf: InterfaceConfig;

    constructor( ) {
        this.setConfigValue();
    }

    setConfigValue() {
        this.interfaceConf = {
            layout: {
                variant: 'Light', // options:  Dark, Light & Transparent
                dir:'ltr', //Options: ltr, rtl
                sidebar: {
                    collapsed: true, //options: true, false
                    size: 'sidebar-md', // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
                    backgroundColor: "custom", // Options: 'black', 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love'
                    backgroundImage: false, // Options: true, false | Set true to show background image
                    backgroundImageURL: 'assets/img/sidebar-bg/01.jpg',
                    smallNav: true
                }
            }
        }
    }



}
