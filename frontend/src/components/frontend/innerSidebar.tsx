"use client";

type descriptionProps = {
    title: string,
    features: {
        title: string,
        description: string
    }[],
    instructionsTitle: string,
    instructions: string[]
}

export default function InnerSideBar({description}: {description: descriptionProps}) {
    return (
        <div className="py-5 px-8 border-1 rounded-2xl bg-white dark:bg-black lg:order-2">
        <h3 className="font-bold mb-3">{description.title}</h3>
        <ul className="list-style-none">
          {description.features.map((feature, index) => (
            <li key={index} className="mb-2 bg-gray-100 dark:bg-gray-900 p-2 rounded-lg">
              <b>{feature.title}</b><br/>
              <span className="text-sm text-gray-500"> {feature.description}</span>
            </li>
          ))}
        </ul>
        <hr className="my-3"/>
        <h3 className="font-bold mb-3">{description.instructionsTitle}</h3>
        <ul className="list-decimal ml-5 mb-5">
          {
            description.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))
          }
        </ul>
      </div>
    );
}
  