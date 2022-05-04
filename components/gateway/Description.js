import { decode } from "html-entities";

const Description = ({ description, fallback, markdown }) => {
  return (
    (description !== fallback || markdown) && (
      <div className="flex flex-col space-y-4">
        <p className="font-bold text-wall-400">Description</p>
        {markdown ? (
          <div
            className="flex flex-col space-y-4"
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          />
        ) : (
          <p>{description}</p>
        )}
      </div>
    )
  );
};

export default Description;
