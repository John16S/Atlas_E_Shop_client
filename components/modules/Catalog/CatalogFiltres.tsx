import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFilterDesktop from './CatalogFilterDesktop'
import { ICatalogFilterProps } from '@/types/catalog'

const CatalogFilter = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
}: ICatalogFilterProps) => {
    const isMobile = useMediaQuery(820)

    //У нас будет 2 CatalogFilter (1-CatalogFilterMobile, 2-CatalogFilterDesktop)
    return (
        <>
            {isMobile ? (
                <div />
            ) : (
                <CatalogFilterDesktop
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                />
            )}
        </>
    )
}

export default CatalogFilter
