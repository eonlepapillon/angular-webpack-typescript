import {IModule, module} from 'angular';

export let ttt: IModule = module('tttComponents', []);

ttt.run(function () {
    console.log('tttComponents');
});
