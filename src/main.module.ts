import {module} from 'angular';

export let app: angular.IModule = module('app', []);

app.run(function () {
    console.log('PING');
});
