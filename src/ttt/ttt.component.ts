import {ttt} from './ttt.module';
import {IComponentOptions, IComponentController, ILogService} from 'angular';

export default class TttController implements IComponentController{
    public title = 'Hello world!';


    constructor($log: ILogService){
        'ngInject';
        console.log('lalalala');
        $log.info('tttComponent');
    }
}

const tttComponent: IComponentOptions = {
    template: require('./ttt.html'),
    controller: TttController
};

ttt.component('tttComponent', tttComponent);