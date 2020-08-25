import store from '@/store'

export default () => {
    store.dispatch('setLang', localStorage.getItem('lang') || navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US')
}