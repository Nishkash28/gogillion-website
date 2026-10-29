# Mobile rendering audit — 30 October 2026

## Reported defects and changes

- Blank/flickering phone artwork: flattened the phone's internal compositing surface while retaining outer 3D scroll transforms. Removed nested 3D rotation from ambient sway. Phone images no longer flex-shrink; Nirvaan has an explicit aspect ratio. These address likely WebKit compositing and sizing contributors; physical-iPhone verification remains necessary.
- Competing animation ownership: removed the independent entrance tween from the same phone wrappers controlled by the scroll timeline. Deep-linked hash scenes skip the hero copy entrance.
- Empty screen during identity changes: keep the outgoing identity opaque beneath the incoming identity, hiding it only once the incoming fade completes. Explicit layer order makes this reversible.
- Nirvaan tagline clipping: size type against the actual logo container rather than the viewport; constrain its width and allow wrapping instead of clipping.
- Architecture overlap: actual circular logo containers constrain their contents; flexible grid tracks and captions remain separate. Includes GGT Business.
- Mission and vision: updated to the supplied wording.

## Validation

Production TypeScript/Vite build passed. Browser checks at 320, 375, 430,
768, 1024, 1280 and 1440 CSS pixels found no page horizontal overflow,
no architecture logo/caption overlaps, and no phone tagline overflow.
All eagerly loaded phone images had valid intrinsic dimensions. Mobile
forward and reverse scroll checks reached HerA and Lucida with the correct
visible identity. Browser console contained no warnings or errors.

Visual review covered the hero, app scene and architecture layouts at a
390px viewport. These are desktop browser viewport checks, not physical
Safari/iPhone testing. Recheck the reported iPhone after deploying, including
slow and fast scroll, reverse scroll, toolbar collapse and orientation change.
Reduced-motion static content is retained; its device-level behavior was not
emulated in this browser session.
