# Homepage Preview Debug Notes

- FAQ JSON-LD integration in `MicroFaq` passes a `data` prop to `FAQJsonLd`, but the component expects `items` and maps over it; this likely triggers a runtime error when the component renders.
