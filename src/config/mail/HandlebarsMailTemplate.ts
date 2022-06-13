import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}
export default class handlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parserTemplate = handlebars.compile(template);

    return parserTemplate(variables);
  }
}
