const ModuleQuran = require('../../../lib/ModuleQuran'); //import quran her
describe('quran', () => {
    it('the it is', () => {
        const surat = [
            {
                '_id':'1',
                'total_ayat':'17'
            },
            {
                '_id':'2',
                'total_ayat':'53'
            },
            {
                '_id':'3',
                'total_ayat':'8'
            },
            {
                '_id':'4',
                'total_ayat':'20'
            }
        ];

        const users = [
            {
                '_id':'1',
                'name':'hery'
            },
            {
                '_id':'2',
                'name':'septy'
            },
            {
                '_id':'3',
                'name':'nia'
            }
        ];

        const result = new ModuleQuran();
        const result2 = result.getGenerate(users, surat);
        console.log(result2[0]);
        // expect(result).toBe('a');
    });
});