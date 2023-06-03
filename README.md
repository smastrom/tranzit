# Tranzit

1KB dead simple library to conditionally animate React components using the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

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

For anything else more complex use a library like [Framer Motion](https://www.framer.com/motion/) and don't waste your time here.

<br />

## Usage

Each Tranzit component is a transition that you can import:

```js
import { Fade, Slide, Bounce, Zoom, Flash, Shake } from 'tranzit'
```

No configuration needed besides passing a booleanish value to `when`:

```jsx
<Fade when={showModal}>
  <Modal />
</Fade>
```

The component must have a single child and it must be a React/HTML element.

### Customization

By default each animation when leaving will fade out. Set `reverse` to **true** to reverse it:

```jsx
<Slide when={showMenu} reverse>
  <Menu />
</Slide>
```

Tweak duration and delay:

```jsx
<Slide when={showModal} durIn={300} durOut={200} delayIn={100} delayOut={0}>
  <Modal />
</Slide>
```

Customize x/y origin:

```jsx
<Slide when={showModal} startY={0} startX={-300}>
  <MobileMenu />
</Slide>
```

By default, in transitions are not played on first render. Set `initial` to **true** to play them instead:

```jsx
<Zoom when={showModal} initial>
  <Modal />
</Zoom>
```

Use `display: none` instead of unmounting:

```jsx
<Zoom when={showModal} hide>
  <Modal />
</Zoom>
```

Use `keep` to keep the layout intact using `visibility: hidden`:

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

That's it.

<br />

## Create your own Tranzit component

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

## License

MIT © [smastrom](https://github.com/smastrom)
