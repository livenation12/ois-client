import NoDocImage from "../../../assets/nodocs.svg";
export default function NoDocumentFound({ title }: { title?: string }) {
     return (
          <div className="flex flex-col justify-center items-center py-3">
               <div className="md:text-lg lg:text-2xl text-muted-foreground">{title}</div>
               <div className="size-1/3">
                    <img src={NoDocImage} alt="No list found" />
               </div>
          </div>
     )
}
