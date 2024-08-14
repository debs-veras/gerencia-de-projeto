import moment from "moment";
import "moment/dist/locale/pt-br";
import "moment/locale/pt-br";

export const formatarData = (data: Date | string, tipo: "" | "data" | "hora" = "", segundos: boolean = false): string => { // "data", "hora"
    if (tipo == "data")
        return moment(data).format('DD/MM/YYYY');
    if (tipo == "hora")
        return segundos ? moment(data).format('HH:mm:ss') : moment(data).format('HH:mm');

    return segundos ? moment(data).format('DD/MM/YYYY HH:mm:ss') : moment(data).format('DD/MM/YYYY HH:mm');
}

export const formatarHorarioApi = (horario: Date | string): string => {
    if (!horario) return "";
    return moment(horario).format('YYYY-MM-DDTHH:mm:ss');
}

