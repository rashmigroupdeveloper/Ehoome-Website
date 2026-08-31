import MagneticButton from '../components/MagneticButton';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="wrap">
        <h1>This page is off the line.</h1>
        <p>The address does not match a station on this site. Head back to the plant overview or send an enquiry.</p>
        <MagneticButton to="/">Back to home</MagneticButton>
      </div>
    </div>
  );
}
