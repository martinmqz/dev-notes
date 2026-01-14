{items.map((item, index) => (
  <Row key={index} {...item} />
))}

{items.map((item, id) => (
  <Row key={id} {...item} />
))}