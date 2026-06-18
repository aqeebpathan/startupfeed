import Form from "next/form";

import { Input } from "./ui/input";
import { Field } from "./ui/field";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action={"/"} scroll={false} className="mt-10">
      <Field orientation={"horizontal"} className="max-w-md mx-auto">
        <Input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search Startups"
        />
        <Button type="submit" size={"lg"}>
          Search
        </Button>
      </Field>
    </Form>
  );
};

export default SearchForm;
