import {Stack} from "@ozen-ui/kit/Stack";
import {Typography} from "@ozen-ui/kit/Typography";
import {Select, Option} from "@ozen-ui/kit/Select";
import {Pagination} from "@ozen-ui/kit/Pagination";
import s from "./UsersPagination.module.css"
type Props = {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    pageSizeOptions?: number[];
};

export function UsersPagination(props: Props) {
    const {
        page,
        pageSize,
        total,
        onPageChange,
        onPageSizeChange,
    } = props;
    const pageZero = Math.max(0, page - 1);


    return (
        <Stack direction="row" align="center" justify="spaceBetween" gap="m" fullWidth>
            <Pagination
                page={pageZero}
                pageSize={pageSize}
                totalCount={total}
                siblingCount={2}
                size="s"
                onPageChange={(p) => onPageChange(p + 1)}
            />
            <Stack direction="row" align="center" gap="m">
                <Typography variant="text-s" color="secondary">
                   Записей на странице
                </Typography>
                <Select
                    className={s.selectPagination}
                    size="s"
                    value={pageSize}
                    onChange={value => onPageSizeChange(Number(value))}
                >
                    <Option value={10}>
                        10
                    </Option>
                    <Option value={20}>
                        20
                    </Option>
                    <Option value={50}>
                        50
                    </Option>
                    <Option value={100}>
                        100
                    </Option>
                </Select>
                <Typography variant="text-s" color="secondary">
                из {total}
                </Typography>
            </Stack>
        </Stack>
    );
}
