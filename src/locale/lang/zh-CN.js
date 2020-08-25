import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
    antLocale: antd,
    momentName: 'zh-cn',
    momentLocale: momentCN
}

const locale = {
    'test': '中文'
}

export default {
    ...components,
    ...locale
}