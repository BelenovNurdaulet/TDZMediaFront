import {TableCell} from "@ozen-ui/kit/Table";

import {Typography} from "@ozen-ui/kit/Typography";
import {SortDownIcon, SortUpIcon} from "@ozen-ui/icons";
import s from "./SortableHeader.module.css"
import type {SortField} from "@/entities/user/userTypes.ts";

type Props = {
    field: SortField;
    label: string;
    sortBy?: SortField;
    sortDir?: "asc" | "desc";
    onSort: (field: SortField) => void;
};

export function SortableHeader(props: Props) {
    const {field, label, sortBy, sortDir, onSort} = props;

    const isActive = sortBy === field;

    return (
        <TableCell align="left" onClick={() => onSort(field)} className={s.clickableHeader}>
            <Typography className={s.headerContent} variant={'caption-3xs_1'} align={'left'} color={'accentDisabled'}
                        style={{...(isActive && {color: '#007aff'})}}>
                {label}
                {sortDir === "asc" ?
                    (<SortDownIcon className={s.headerIconActive}/>) :
                    (<SortUpIcon className={s.headerIconActive}/>)
                }
            </Typography>
        </TableCell>
    );
}

