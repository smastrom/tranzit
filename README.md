# Tranzit

500B Dead-simple library to conditionally render React components using [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

<br />

## Why?

Sometimes you're just looking for a straightforward way to conditionally transition components.

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

For anything else more complex you should use a library like [Framer Motion](https://www.framer.com/motion/).

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
<Slide
  when={showModal}
  duration={{ in: 300, out: 200 }} // or just duration={200} for both
  delay={{ in: 300, out: 200 }} // Same here
>
  <Modal />
</Slide>
```

Customize the origin:

```jsx
<Zoom when={showModal} origin={{ x: -1000, y: -2000 }}>
  <Modal />
</Zoom>
```

Skip the animation on mount:

```jsx
<Zoom when={showModal} skip>
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
<Zoom when={errors.phoneNumber} persist>
  <div className="error">{errors.phoneNumber}</div>
</Zoom>
```

Nest transitions:

```jsx
<Fade when={showModal}>
  <ModalBackground>
    <Slide when={showModal} delay={{ in: 200, out: 0 }}>
      <ModalContent>
        <Zoom when={showModal} delay={{ in: 400, out: 0 }}>
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
