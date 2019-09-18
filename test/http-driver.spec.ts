import {eeTestServerLifecycle, HttpDriver} from '../src';
import {expect} from 'chai';

const config = (global as any).emptyEpsilonConfig as {
    runServer: string;
    killServer: string;
    serverAddress: string;
};

describe('EE HTTP Driver', () => {
    eeTestServerLifecycle(config);
    let httpDriver: HttpDriver;
    beforeEach(() => {
        httpDriver = new HttpDriver(config.serverAddress);
    });

    async function expectShipState(httpDriver: HttpDriver, eRotation: number, eHull: number) {
        let rotation = httpDriver.query('getPlayerShip(-1):getRotation()');
        let hull = httpDriver.query('getPlayerShip(-1):getHull()');
        expect(await rotation, 'rotation').to.approximately(eRotation, 0.01);
        expect(await hull, 'hull').to.approximately(eHull, 0.01);
        return {rotation, hull};
    }

    async function setShipState(httpDriver: HttpDriver, sRotation: string, sHull: string) {
        await Promise.all([
            httpDriver.command('getPlayerShip(-1):setRotation({0})', [sRotation]),
            httpDriver.command('getPlayerShip(-1):setHull({0})', [sHull])
        ]);
    }

    it('updates rotation and heading', async function () {
        await expectShipState(httpDriver, 0, 250);
        await setShipState(httpDriver, '0', '122');
        // await ship.setHull(50);
        await expectShipState(httpDriver, 0, 122);
    });

    it('gets multiple values', async function () {
        await httpDriver.command('getPlayerShip(-1):setPosition({0}, {1})', ['123', '456']);
        let pos = await httpDriver.query('getPlayerShip(-1):getPosition()', 2);
        expect(pos, 'position').to.eql([123, 456]);
    });
});
