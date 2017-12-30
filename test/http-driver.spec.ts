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
        expect(await rotation, 'rotation').to.eql(eRotation);
        expect(await hull, 'hull').to.eql(eHull);
        return {rotation, hull};
    }

    async function setShipState(httpDriver: HttpDriver, sRotation: string, sHull: string) {
        await Promise.all([
            httpDriver.command('getPlayerShip(-1):setRotation({0})', [sRotation]),
            httpDriver.command('getPlayerShip(-1):setHull({0})', [sHull])
        ]);
    }

    it('gets rotation and heading', async function () {
        await expectShipState(httpDriver, 0, 250);
        await setShipState(httpDriver, '0', '122');
        // await ship.setHull(50);
        await expectShipState(httpDriver, 0, 122);
    });

    it('gets multiple values', async function () {
        let pos = httpDriver.query('getPlayerShip(-1):getPosition()', 2);
        expect(await pos, 'position').to.eql([0, 0]);
    });
});
