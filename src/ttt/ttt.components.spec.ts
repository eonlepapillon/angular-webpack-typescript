import TttController from './ttt.component';

describe('Controller', () => {
    let createController: Function;
    let $logMock: any;

    console.log('HERE');

    beforeEach(function () {
        $logMock = jasmine.createSpyObj('$log', ['info']);

        createController = () => {
            return new TttController($logMock);
        }
    });

    it('should get message from service', () => {
        createController();
        expect($logMock.info).toHaveBeenCalled();
    });
});
