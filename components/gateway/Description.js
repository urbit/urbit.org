import { Markdown } from "foundation-design-system";

const Description = ({ description, fallback, markdown }) => {
  return (
    (description !== fallback || markdown) && (
      <div className="flex flex-col space-y-4">
        <p className="font-bold text-wall-400">Description</p>
        {markdown ? (
          <div className="markdown">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
        ) : (
          <p>{description}</p>
        )}
      </div>
    )
  );
};

export default Description;
