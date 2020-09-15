import { h, defineComponent, computed, mergeProps } from "vue"
import { View, CommonEvent } from '@tarojs/components'
import { AtCurtainProps } from 'types/curtain'

const AtCurtain = defineComponent({
    name: "AtCurtain",

    props: {
        // 参数
        isOpened: Boolean,
        closeBtnPosition: {
            type: String as () => AtCurtainProps['closeBtnPosition'],
            default: 'bottom' as AtCurtainProps['closeBtnPosition']
        },
        // 事件
        onClose: {
            type: Function as unknown as () => AtCurtainProps['onClose'],
            default: () => () => { }
        }
    },

    setup(props: AtCurtainProps, { attrs, slots }) {
        const curtainClass = computed(() => ({
            'at-curtain': true,
            'at-curtain--closed': !props.isOpened
        }))

        const btnCloseClass = computed(() => ({
            'at-curtain__btn-close': true,
            [`at-curtain__btn-close--${props.closeBtnPosition}`]: props.closeBtnPosition
        }))

        function handleClose(e: CommonEvent) {
            e.stopPropagation()
            props.onClose(e)
        }

        return () => (
            h(View, mergeProps(attrs, {
                class: curtainClass.value,
                onTap: (e: CommonEvent) => { e.stopPropagation() }
            }), [
                h(View, { class: 'at-curtain__container' }, [
                    h(View, { class: 'at-curtain__body' }, [
                        slots.default && slots.default(),
                        h(View, {
                            class: btnCloseClass.value,
                            onTap: handleClose.bind(this)
                        })
                    ])
                ])
            ])
        )
    }
})

export default AtCurtain