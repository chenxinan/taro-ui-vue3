import { h, defineComponent, computed } from 'vue'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import { AtNavBarProps } from 'types/nav-bar'
import { mergeStyle, pxTransform } from '@/utils/common'
import AtComponentWithDefaultProps from '../mixins'

const AtNavBar = defineComponent({
    mixins: [
        AtComponentWithDefaultProps
    ],

    props: {
        title: {
            type: String as () => AtNavBarProps['title'],
            default: ''
        },
        fixed: Boolean,
        border: {
            type: Boolean,
            default: true
        },
        color: {
            type: String as () => AtNavBarProps['color'],
            default: '#6190E8'
        },
        leftIconType: {
            type: [String, Object] as unknown as () => AtNavBarProps['leftIconType'],
            default: ''
        },
        leftText: {
            type: String as () => AtNavBarProps['leftText'],
            default: ''
        },
        rightFirstIconType: {
            type: [String, Object] as unknown as () => AtNavBarProps['rightFirstIconType'],
            default: ''
        },
        rightSecondIconType: {
            type: [String, Object] as unknown as () => AtNavBarProps['rightFirstIconType'],
            default: ''
        },
        // events
        onClickLeftIcon: Function as unknown as () => AtNavBarProps['onClickLeftIcon'],
        onClickRgIconSt: Function as unknown as () => AtNavBarProps['onClickRgIconSt'],
        onClickRgIconNd: Function as unknown as () => AtNavBarProps['onClickRgIconNd']
    },

    setup(props: AtNavBarProps, { slots }) {

        function handleClickLeftView(event: ITouchEvent): void {
            props.onClickLeftIcon && props.onClickLeftIcon(event)
        }

        function handleClick1St(event: ITouchEvent): void {
            props.onClickRgIconSt && props.onClickRgIconSt(event)
        }

        function handleClick2Nd(event: ITouchEvent): void {
            props.onClickRgIconNd && props.onClickRgIconNd(event)
        }

        return () => {

            const linkStyle = computed(() => ({ color: props.color }))

            const defaultIconInfo = {
                customStyle: '',
                className: '',
                prefixClass: 'at-icon',
                value: '',
                color: '',
                size: 24
            }

            const leftIconInfo = computed(() => 
                props.leftIconType instanceof Object
                    ? { ...defaultIconInfo, ...props.leftIconType }
                    : { ...defaultIconInfo, value: props.leftIconType }
            )

            const leftIconClass = computed(() => classNames(
                leftIconInfo.value.prefixClass,
                {
                    [`${leftIconInfo.value.prefixClass}-${leftIconInfo.value.value}`]: leftIconInfo.value.value
                },
                leftIconInfo.value.className
            ))

            const rightFirstIconInfo = computed(() =>
                props.rightFirstIconType instanceof Object
                    ? { ...defaultIconInfo, ...props.rightFirstIconType }
                    : { ...defaultIconInfo, value: props.rightFirstIconType }
            )

            const rightFirstIconClass = computed(() => classNames(
                rightFirstIconInfo.value.prefixClass,
                {
                    [`${rightFirstIconInfo.value.prefixClass}-${rightFirstIconInfo.value.value}`]: rightFirstIconInfo.value.value
                },
                rightFirstIconInfo.value.className
            ))

            const rightSecondIconInfo = computed(() =>
                props.rightSecondIconType instanceof Object
                    ? { ...defaultIconInfo, ...props.rightSecondIconType }
                    : { ...defaultIconInfo, value: props.rightSecondIconType }
            )

            const rightSecondIconClass = computed(() => classNames(
                rightSecondIconInfo.value.prefixClass,
                {
                    [`${rightSecondIconInfo.value.prefixClass}-${rightSecondIconInfo.value.value}`]: rightSecondIconInfo.value.value
                },
                rightSecondIconInfo.value.className
            ))

            const rootClass = computed(() => classNames(
                {
                    'at-nav-bar': true,
                    'at-nav-bar--fixed': props.fixed,
                    'at-nav-bar--no-border': !props.border
                },
                props.className
            ))

            const leftIconStyle = computed(() => mergeStyle(
                {
                    color: leftIconInfo.value.color,
                    fontSize: `${pxTransform(
                        parseInt(leftIconInfo.value.size.toString()) * 2
                    )}`
                },
                leftIconInfo.value.customStyle
            ))

            const rightSecondIconStyle = computed(() => mergeStyle(
                {
                    color: rightSecondIconInfo.value.color,
                    fontSize: `${pxTransform(
                        parseInt(rightSecondIconInfo.value.size.toString()) * 2
                    )}`
                },
                rightSecondIconInfo.value.customStyle
            ))
            const containerClass = computed(() => (iconType) => classNames({
                'at-nav-bar__container': true,
                'at-nav-bar__container--hide': !iconType
            }))

            const rightFirstIconStyle = computed(() => mergeStyle(
                {
                    color: rightFirstIconInfo.value.color,
                    fontSize: `${pxTransform(
                        parseInt(rightFirstIconInfo.value.size.toString()) * 2
                    )}`
                },
                rightFirstIconInfo.value.customStyle
            ))

            return (
                h(View, {
                    class: rootClass.value,
                    style: props.customStyle
                }, {
                    default: () => [
                        // left-view
                        h(View, {
                            class: 'at-nav-bar__left-view',
                            style: linkStyle.value,
                            onClick: handleClickLeftView
                        }, {
                            default: () => [
                                (props.leftIconType) && (
                                    h(Text, {
                                        class: leftIconClass.value,
                                        style: leftIconStyle.value
                                    })
                                ),
                                h(Text, { class: 'at-nav-bar__text' }, props.leftText)
                            ]
                        }),
                        // title
                        h(View, { class: 'at-nav-bar__title' },
                            props.title || slots.default && slots.default()
                        ),
                        // right-view
                        h(View, { class: 'at-nav-bar__right-view' }, {
                            default: () => [
                                // 2nd icon
                                h(View, {
                                    class: containerClass.value(props.rightSecondIconType),
                                    style: linkStyle.value,
                                    onClick: handleClick2Nd
                                }, {
                                    default: () => [
                                        (props.rightSecondIconType) && (
                                            h(Text, {
                                                class: rightSecondIconClass.value,
                                                style: rightSecondIconStyle.value
                                            })
                                        )
                                    ]
                                }),
                                // 1st icon
                                h(View, {
                                    class: containerClass.value(props.rightFirstIconType),
                                    style: linkStyle.value,
                                    onClick: handleClick1St
                                }, {
                                    default: () => [
                                        (props.rightFirstIconType) && (
                                            h(Text, {
                                                class: rightFirstIconClass.value,
                                                style: rightFirstIconStyle.value
                                            })
                                        )
                                    ]
                                })
                            ]
                        })
                    ]
                })
            )
        }
    }
})

export default AtNavBar
