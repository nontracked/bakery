import './CatalogSkeleton.scss'
import ContentLoader from "react-content-loader";

export const CatalogSkeleton = () => {
  return (
    <ul className="catalog-client__list catalog-skeleton__list">
      {[...Array(8)].map((_, index) => (
        <li key={index}>
          <ContentLoader
            speed={1}
            width="100%"   // Позволяем тянуться по ширине родителя
            height="100%"  // Позволяем тянуться по высоте
            viewBox="0 0 389 691" // Оставляем оригинальную сетку координат!
            backgroundColor="#cfcfcf"
            foregroundColor="#b8b8b8"
            style={{ width: '100%', height: 'auto', aspectRatio: '387 / 691' }} // Гарантирует правильные пропорции
          >
            <rect x="0" y="0" rx="5" ry="5" width="384" height="538" />
            <rect x="0" y="562" rx="3" ry="3" width="315" height="24" />
            <rect x="0" y="596" rx="3" ry="3" width="60" height="36" />
            <rect x="0" y="660" rx="3" ry="3" width="54" height="24" />
            <rect x="245" y="641" rx="3" ry="3" width="140" height="54" />
          </ContentLoader>
        </li>
      ))}
    </ul>
  )
}