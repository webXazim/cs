import { Fragment } from 'react';

export default function UseLine({ className, ariaLabel, eyebrow, items }) {
  return (
    <div className={className} aria-label={ariaLabel}>
      <small>{eyebrow}</small>
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && <i aria-hidden="true"></i>}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
