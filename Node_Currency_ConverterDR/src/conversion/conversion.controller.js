import axios from "axios";

export const convertData = async(req, res) => {
    const path = process.env.API_URL;
    const key = process.env.API_KEY;
    const { from, to, amount } = req.body;
    const url = `${path}/${key}/pair/${from}/${to}/${amount}`;
    try {
        const { data }= await axios.get(url);
        if(data && data.result === 'success') return res.send(
            {
                from: from,
                to: to,
                conversionRate: data.conversion_rate,
                convertedAmount: data.conversion_result
            });
            return res.status(418).send({message: `Error en la solicitud`, data})
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: `Error al realizar la conversion`, error});
    }
}