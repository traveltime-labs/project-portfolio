
import { Link } from "@/i18n/routing"; // 注意要用我們自定義的 Link

interface TimeLineItem {
    date: string;
    title?: string;
    desc?: string;
    link?: string;
}

interface TimeLineGroup {
    year: string;
    data: TimeLineItem[];
}


const TimeLine = ({ List }: { List: TimeLineGroup[] }) => {

    return (
        <div className="space-y-10" data-testid="timeline-root">
          {List.map((group, groupIndex) => (
            <section key={group.year} aria-labelledby={`year-${group.year}`} data-testid={`timeline-group-${groupIndex}`}>
              <h3 id={`year-${group.year}`} className="text-xl font-semibold mb-4" data-testid={`timeline-year-${groupIndex}`}>
                {group.year}
              </h3>

              <ul className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-6" data-testid={`timeline-list-${groupIndex}`}>
                {group.data.map((item, itemIndex) => (
                  <li
                    key={`${group.year}-${item.date}-${item.title}`}
                    className="mb-6 relative"
                    aria-label={`${item.title} ${item.date}`}
                    data-testid={`timeline-item-${groupIndex}-${itemIndex}`}
                  >
                    <span className="absolute -left-7.75 top-0 w-3 h-3 bg-white  border-2 border-indigo-500 rounded-full" data-testid={`timeline-dot-${groupIndex}-${itemIndex}`} />

                    <div className="flex flex-col sm:items-start gap-3">
                      <div className="w-24 shrink-0 text-xs text-gray-500 font-medium" data-testid={`timeline-date-${groupIndex}-${itemIndex}`}>{item.date}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold leading-snug" data-testid={`timeline-title-${groupIndex}-${itemIndex}`}>{item.title}</h4>
                          {item.link ? (
                            <Link href={item.link} className="text-indigo-600 text-sm hover:underline" data-testid={`timeline-link-${groupIndex}-${itemIndex}`}>
                              連結
                            </Link>
                          ) : null}
                        </div>

                        {item.desc ? (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2" data-testid={`timeline-desc-${groupIndex}-${itemIndex}`}>{item.desc}</p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
    );
}


export default TimeLine;