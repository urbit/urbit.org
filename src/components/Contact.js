import NewsletterSignup from "./NewsletterSignup";

export default function Contact({
  emphasize,
  ecosystem = false,
  className = "",
}) {
  const linkText = emphasize ? "text-green-400" : "text-wall-600";
  const border = emphasize ? "border-green-400" : "border-wall-600";

  return (
    <div className={className}>
      <NewsletterSignup color={border} />
    </div>
  );
}
