# Tranzit

500B Dead-simple library to conditionally animate React components using [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

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

For anything else more complex use a library like [Framer Motion](https://www.framer.com/motion/).

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

### Customization

By default each transition when leaving will fade out. Set `reverse` to **true** to reverse the animation:

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

Customize the origin:

```jsx
<Zoom when={showModal} origin={{ x: -1000, y: -2000 }}>
  <Modal />
</Zoom>
```

By default, in transitions are not played on first render. Set `initial` to **true** to play the in transition on first render:

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

Use `keep` to keep the layout intact using `visibility: hidden` (for example when rendering form field errors):

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

## License

MIT © [smastrom](https://github.com/smastrom)
