# Tranzit

### :warning: **This is a work in progress.**

<br />

1KB dead simple library to conditionally animate React components using performant [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

[Live Demo](https://trazit.netlify.app) - Real world examples: [Menu]() - [Modal]() - [Intersection Observer]()

<br />

## How?

Instead of:

```jsx
showModal && <Modal />
```

Do:

```jsx
<Fade when={showModal}>
  <Modal />
</Fade>
```

For anything more complex use a library like [Framer Motion](https://www.framer.com/motion/) and don't waste your time here.

<br />

## Usage

Each transition is a component that you can import:

```js
import {
  Bling,
  Fade,
  Wobble,
  Swash,
  Bounce,
  BounceHorizontal,
  Flash,
  Pulse,
  Shake,
  ShakeHorizontal,
  Slide,
  Swirl,
  Vibrate,
  Focus,
  Flip
} from 'tranzit'
```

No configuration needed besides passing a falsy/truthy value to `when`:

```jsx
<Fade when={showModal}>
  <Modal />
</Fade>
```

The component must have a **single child** and it must be a React component/element (no fragments).

### Customization

By default each animation when leaving will fade out. Set `reverse` to **true** to reverse it:

```jsx
<Slide when={showMenu} reverse>
  <Menu />
</Slide>
```

Customize duration and delay:

```jsx
<Slide when={showModal} durIn={300} durOut={200} delayIn={100} delayOut={0}>
  <Modal />
</Slide>
```

Customize x/y origin (works with any component, also custom ones):

```jsx
<Fade when={showModal} startY={0} startX={-300}>
  <MobileMenu />
</Fade>
```

By default, entrance animations are not played on first render. Set `initial` to **true** to play them:

```jsx
<Zoom when={showModal} initial>
  <Modal />
</Zoom>
```

Toggle `display: none` instead of unmounting:

```jsx
<Zoom when={showModal} hide>
  <Modal />
</Zoom>
```

Toggle `visibility: hidden` instead of unmounting:

```jsx
<Zoom when={errors.phoneNumber} keep>
  <div className="error">{errors.phoneNumber}</div>
</Zoom>
```

Nest transitions:

```jsx
<Fade when={showModal}>
  <ModalBackground>
    <Slide when={showModal} delayIn={200}>
      <ModalContent>
        <Zoom when={showModal} delayIn={400}>
          <Modal />
        </Zoom>
      </ModalContent>
    </Slide>
  </ModalBackground>
</Fade>
```

<br />

## Create your own

```tsx
import { Tranzit, type TranzitProps } from 'tranzit'

export function Bounce(props: TranzitProps) {
  return (
    <Tranzit
      keyframes={{
        opacity: [0, 1],
        transformOrigin: ['50% 50%', '50% 50%'],
        transform: ['scale(2,2)', 'scale(1,1)']
      }}
      keyframeOptions={{
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both'
      }}
      {...props}
    />
  )
}
```

**Documentation:** [`keyframes`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) - [`keyframeOptions`](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#parameters)

<br />

## API

| Prop       | Type        | Default | Description                                   |
| ---------- | ----------- | ------- | --------------------------------------------- |
| `when`     | `Primitive` | `true`  | Value to toggle animations                    |
| `reverse`  | `boolean`   | `false` | Reverse animation when leaving                |
| `initial`  | `boolean`   | `false` | Play animation on first render                |
| `hide`     | `boolean`   | `false` | Use `display: none` instead of unmounting     |
| `keep`     | `boolean`   | `false` | Use `visibility: hidden` instead of unmouting |
| `durIn`    | `number`    | `300`   | Duration when entering                        |
| `durOut`   | `number`    | `300`   | Duration when leaving                         |
| `delayIn`  | `number`    | `0`     | Delay when entering                           |
| `delayOut` | `number`    | `0`     | Delay when leaving                            |
| `startY`   | `number`    | `0`     | Y origin when entering                        |
| `startX`   | `number`    | `0`     | X origin when entering                        |

<br />

## Caveats

When using a component as child, Tranzit will render it inside a `<div>` tag.

```jsx
<Fade when={showModal}>
  <MyComponent /> {/* <-- Will be rendered inside a <div> tag */}
</Fade>
```

```jsx
<Fade when={showModal}>
  <h1>This is a great title.<h1/> {/* <-- Will be rendered as is */}
</Fade>
```

While most of the times this is fine, you might need control over the element (for semantic reasons or because you're dealing within a complex layout).

Wrap the component in a HTML element of your choice:

```jsx
<Fade when={showModal}>
  <div>
    <MyComponent />
  </div>
</Fade>
```

Tranzit will render your element (a `<div>` in this case) as is. You can add classes, styles, refs and use any tag you want.

```jsx
<Fade when={showModal}>
  <div ref={myRef} className="myClass" style={{ backgroundColor: 'red' }}>
    <MyComponent />
  </div>
</Fade>
```

<br />

## License

MIT © [smastrom](https://github.com/smastrom)
