/**
 * Created by Reinchard on 9/19/2017.
 */

export const plans = [{
    title: 'THINKER',
    id:'Free',
    description: 'Most unlimited sites without paying us a dime with Client Billing',
    currency: '$',
    amount: '0',
    period: 'month',
    info: [
        {traffic: 500, value: 'GB', desc: 'Traffic'}, {
            traffic: 500,
            value: 'MB',
            desc: 'Hosting space'
        }, {traffic: '', value: '', desc: `Rodin Loader <br> Rodin URL`},
        {traffic: 5, value: '', desc: 'Projects'},
    ]
}, {
    title: 'DAVID',
    id:'Premium',
    description: 'For professionals that need unbranded, advanced features',
    currency: '$',
    amount: '50',
    period: 'month',
    info: [
        {
            traffic: 5,
            value: 'TB',
            desc: 'Traffic'
        },
        {
            traffic: 5,
            value: 'GB',
            desc: 'Hosting space'
        },
        {
            traffic: '',
            value: '',
            desc: `Rodin Loader <br> Rodin Custom URL`
        },
        {
            traffic: 15,
            value: '',
            desc: 'Projects'
        },

    ]
}, {
    title: 'LIBERTY',
    id:'Enterprise',
    description: 'For small agencies and companies <span class="payment-info">(will be available soon)</span>',
    currency: '$',
    amount: '500',
    period: 'month',
    info: [
        {
            traffic: 100,
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
            desc: `Custom Loader <br> Custom URL`
        },
        {
            traffic: `Unlimited`,
            value: '',
            desc: 'Projects'
        }
    ]
}];