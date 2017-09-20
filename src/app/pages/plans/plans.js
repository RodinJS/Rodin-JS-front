/**
 * Created by Reinchard on 9/19/2017.
 */

export const plans = [{
    title: 'THINKER',
    description: 'Most unlimited sites without paying us a dime with Client Billing',
    currency: '$',
    amount: '0',
    period: 'month',
    info: [{traffic: 500, value: 'MB', desc: 'Traffic'}, {
        traffic: 1,
        value: 'GB',
        desc: 'Hosting space'
    }, {traffic: '', value: '', desc: 'Rodin URL'}, {traffic: '', value: '', desc: 'Rodin Loader'}]
}, {
    title: 'DAVID',
    description: 'For professionals that need unbranded, advanced features',
    currency: '$',
    amount: '50',
    period: 'month',
    info: [
        {
            traffic: 3,
            value: 'TB',
            desc: 'Traffic'
        },
        {
            traffic: 40,
            value: 'GB',
            desc: 'Hosting space'
        },
        {
            traffic: '',
            value: '',
            desc: 'Custom URL'
        },
        {
            traffic: '',
            value: '',
            desc: 'Rodin Loader'
        }
    ]
}, {
    title: 'LIBERTY',
    description: 'For small agencies and companies <span class="payment-info">(will be available soon)</span>',
    currency: '$',
    amount: '500',
    period: 'month',
    info: [
        {
            traffic: 6,
            value: 'TB',
            desc: 'Traffic'
        },
        {
            traffic: 200,
            value: 'GB',
            desc: 'Hosting space'
        },
        {
            traffic: '',
            value: '',
            desc: 'Custom URL'
        },
        {
            traffic: '',
            value: '',
            desc: 'Custom Loader'
        }
    ]
}];