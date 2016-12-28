import {IModule, module} from 'angular';
import './ttt';

export let app: IModule = module('app', ['tttComponents']);

app.run(function () {
    console.log('PING');
});
