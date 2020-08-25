import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

const components = {
    antLocale: antdEnUS,
    momentName: 'eu',
    momentLocale: momentEU
}

const locale = {
    'test': '英文'
}

export default {
    ...components,
    ...locale
}