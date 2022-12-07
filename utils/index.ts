export function ReturnAsMovementsResponseType(results: any) {
    return results
        .reduce((p: any, c: any) => {
            const currentYear = c.movementDate.getFullYear();
            if (p.some((x: any) => x.year === currentYear))
                return p;
            return ([
                ...p,
                {
                    year: currentYear,
                    months: results.reduce((pMonths: any, cMonths: any) => {
                        const currentMYear = cMonths.movementDate.getFullYear();
                        const currentMonth = cMonths.movementDate.getMonth() + 1;
                        if (currentMYear !== currentYear || (currentMYear === currentYear && pMonths.some((x: any) => x.month === currentMonth)))
                            return pMonths;
                        return ([
                            ...pMonths,
                            {
                                month: currentMonth,
                                data: results.filter((x: any) => x.movementDate.getFullYear() === currentYear && x.movementDate.getMonth() + 1 === currentMonth)
                            }])
                    }
                        , [])


                }])
        }
            , []);
}