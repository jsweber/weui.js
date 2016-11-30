describe('picker', function () {
    let changeRet = null, confirmRet = null;
    before(() => {
        weui.picker([{
                label: '飞机票',
                value: 0,
                children: [
                    {
                        label: '广州',
                        value: 0
                    },
                    {
                        label: '深圳',
                        value: 1
                    }
                ]
            }, {
                label: '火车票',
                disabled: true,
                value: 1
            }, {
                label: '的士票',
                value: 2,
                children: [
                    {
                        label: '东',
                        disabled: true,
                        value: 'E'
                    },
                    {
                        label: '南',
                        value: 'S'
                    },
                    {
                        label: '西',
                        value: 'W'
                    },
                    {
                        label: '北',
                        value: 'N'
                    }
                ]
        }], {
            onChange: function (result) {
                changeRet = result;
            },
            onConfirm: function (result) {
                confirmRet = result;
            },
            id: 'test'
        });
    });

    it('should render picker', () => {
        const $groups = $('.weui-picker__group');
        assert($('.weui-picker').length === 1);
        assert($groups.length === 2);

        const $group1Items = $groups.eq(0).find('.weui-picker__item'),
            group1 = ['飞机票', '火车票', '的士票'];
        $group1Items.each((index, item) => {
            if(index == 1){
                assert(item.classList.contains('weui-picker__item_disabled'));
            }
            assert(item.innerHTML === group1[index]);
        });

        const $group2Items = $groups.eq(1).find('.weui-picker__item'),
            group2 = ['东', '南', '西', '北'];
        $group2Items.each((index, item) => {
            if(index == 0){
                assert(item.classList.contains('weui-picker__item_disabled'));
            }
            assert(item.innerHTML === group2[index]);
        });
    });

    it('test change callback', () => {
        assert(JSON.stringify(changeRet) === '[2,"W"]');
        assert(confirmRet === null);
    });

    it('test confirmBtn click', (done) => {
        $('#weui-picker-confirm').click();
        assert(JSON.stringify(changeRet) === '[2,"W"]');
        assert(JSON.stringify(confirmRet) === '[2,"W"]');

        setTimeout(() => {
            assert($('.weui-picker').length === 0);

            done();
        }, closeDur);
    });

    it('test mask click', (done) => {
        changeRet = confirmRet = null;
        weui.datePicker({
            start: 1990,
            end: 2000,
            onChange: function (result) {
                changeRet = result;
            },
            onConfirm: function (result) {
                confirmRet = result;
            },
            id: 'DatePicker'
        });
        $('.weui-mask').click();
        assert(JSON.stringify(changeRet) !== null);
        assert(confirmRet === null);

        setTimeout(() => {
            assert($('.weui-picker').length === 0);

            done();
        }, closeDur);
    });

    it('test cancelBtn click', (done) => {
        changeRet = confirmRet = null;
        weui.datePicker({
            start: 1990,
            end: 2000,
            onChange: function (result) {
                changeRet = result;
            },
            onConfirm: function (result) {
                confirmRet = result;
            },
            id: 'DatePicker'
        });
        $('.weui-picker__action[data-action="cancel"]').click();
        assert(JSON.stringify(changeRet) !== null);
        assert(confirmRet === null);

        setTimeout(() => {
            assert($('.weui-picker').length === 0);

            done();
        }, closeDur);
    });
});
