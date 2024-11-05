import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div className="flex flex-col gap-10 mt-20">
      <p className="text-3xl font-semibold">Часто задаваемые вопросы</p>
      <div className="flex flex-col gap-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Можно ли верить этим опросам, ведь можно просто так нажимать на
              ответы?
            </AccordionTrigger>
            <AccordionContent>
              Можно ли верить этим опросам, ведь можно просто так нажимать на
              ответы?
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Насколько это безопасно?</AccordionTrigger>
            <AccordionContent>Насколько это безопасно?</AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Могут ли измениться ценности со временем?
            </AccordionTrigger>
            <AccordionContent>
              Могут ли измениться ценности со временем?
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Только ли от ценностей зависит выбор, когда человек принимает
              решение?
            </AccordionTrigger>
            <AccordionContent>
              Только ли от ценностей зависит выбор, когда человек принимает
              решение?
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Как часто проводятся семинары, где можно задать вопросы?
            </AccordionTrigger>
            <AccordionContent>
              Как часто проводятся семинары, где можно задать вопросы?
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
