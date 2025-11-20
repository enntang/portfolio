# ImageWithHotspots 使用指南

## 概述

`ImageWithHotspots` 是一个可重用的 React 组件，可以在图片的特定位置添加带有同心圆波纹动画的交互式热点按钮。点击按钮会显示 tooltip，点击图片其他位置会关闭 tooltip。

## 特性

- ✅ **同心圆波纹动画**: 持续的波纹扩散效果
- ✅ **自动关闭**: 点击外部区域自动关闭 tooltip
- ✅ **灵活定位**: 使用百分比定位，响应式友好
- ✅ **箭头指向**: Tooltip 支持四个方向的箭头（top, bottom, left, right）
- ✅ **可重用**: 可以在多个图片上使用

## 基本使用

```jsx
import ImageWithHotspots from '../components/utilities/ImageWithHotspots'
import myImage from './path/to/image.png'

function MyComponent() {
  const hotspots = [
    { 
      id: 'point1', 
      x: 30,           // X 坐标（百分比）
      y: 20,           // Y 坐标（百分比）
      content: 'Feature 1 说明',
      arrowPosition: 'bottom'  // 可选：top, bottom, left, right
    },
    { 
      id: 'point2', 
      x: 70, 
      y: 50, 
      content: 'Feature 2 说明',
      arrowPosition: 'top'
    },
  ]

  return (
    <ImageWithHotspots 
      src={myImage}
      alt="My image description"
      hotspots={hotspots}
    />
  )
}
```

## Hotspot 配置选项

每个 hotspot 对象支持以下属性：

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `id` | string | ✅ | - | 唯一标识符 |
| `x` | number | ✅ | - | X 轴位置（百分比，0-100） |
| `y` | number | ✅ | - | Y 轴位置（百分比，0-100） |
| `content` | string | ✅ | - | Tooltip 显示内容 |
| `arrowPosition` | string | ❌ | 'bottom' | 箭头方向：'top', 'bottom', 'left', 'right' |

## 组件 Props

| Prop | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `src` | string | ✅ | - | 图片源 |
| `alt` | string | ✅ | - | 图片替代文本 |
| `hotspots` | array | ✅ | [] | 热点配置数组 |
| `className` | string | ❌ | '' | 图片的额外 CSS 类 |
| `containerClassName` | string | ❌ | '' | 容器的额外 CSS 类 |

## 使用自定义 Hook

如果你需要更多控制，也可以直接使用 `useImageHotspots` hook：

```jsx
import { useImageHotspots } from '../hooks/useImageHotspots'

function CustomComponent() {
  const { 
    containerRef,      // 容器引用
    activeHotspot,     // 当前激活的热点 ID
    setActiveHotspot,  // 设置激活热点的函数
    handleHotspotClick // 点击处理函数
  } = useImageHotspots()

  // 使用这些工具构建自定义界面
  return (
    <div ref={containerRef}>
      {/* 你的自定义内容 */}
    </div>
  )
}
```

## 实际案例

### 案例 1: 产品功能介绍

```jsx
const productHotspots = [
  { 
    id: 'feature1', 
    x: 25, 
    y: 30, 
    content: '智能推荐系统',
    arrowPosition: 'bottom'
  },
  { 
    id: 'feature2', 
    x: 50, 
    y: 45, 
    content: '实时数据分析',
    arrowPosition: 'bottom'
  },
  { 
    id: 'feature3', 
    x: 75, 
    y: 30, 
    content: '自动化工作流',
    arrowPosition: 'bottom'
  },
]

<ImageWithHotspots 
  src={productScreenshot}
  alt="产品功能展示"
  hotspots={productHotspots}
/>
```

### 案例 2: 用户界面导览

```jsx
const uiTourHotspots = [
  { 
    id: 'menu', 
    x: 10, 
    y: 10, 
    content: '点击这里打开菜单',
    arrowPosition: 'right'
  },
  { 
    id: 'search', 
    x: 50, 
    y: 10, 
    content: '在此搜索内容',
    arrowPosition: 'bottom'
  },
]

<ImageWithHotspots 
  src={uiScreenshot}
  alt="用户界面"
  hotspots={uiTourHotspots}
  containerClassName="shadow-xl rounded-lg"
/>
```

## 注意事项

1. **坐标定位**: X 和 Y 使用百分比（0-100），相对于图片的宽度和高度
2. **点击区域**: 按钮使用 `z-10`，tooltip 使用 `z-20`，确保层级正确
3. **响应式**: 使用百分比定位使组件在不同屏幕尺寸下都能正常工作
4. **无障碍**: 按钮包含 `aria-label`，提升可访问性

## 样式定制

如果需要自定义样式，可以通过 `className` 和 `containerClassName` 添加：

```jsx
<ImageWithHotspots 
  src={myImage}
  alt="Custom styled image"
  hotspots={hotspots}
  className="rounded-xl shadow-2xl"
  containerClassName="my-8 border-4 border-gray-200"
/>
```

## 技术栈

- React Hooks (useState, useEffect, useRef)
- Tailwind CSS
- 事件处理和冒泡控制

