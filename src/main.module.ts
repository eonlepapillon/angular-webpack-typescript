import {IModule, module} from 'angular';
import 'redux';
import './ttt';

export let app: IModule = module('app', ['tttComponents']);

app.run(function () {
    console.log('PING');
});
