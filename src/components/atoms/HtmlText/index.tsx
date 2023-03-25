interface IHtmlTextProps {
  text: string;
}

const HtmlText = ({ text }: IHtmlTextProps) => {
  return (
    <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: text }} />
  )
}

export default HtmlText;
