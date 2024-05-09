import { FC } from "react";
import { trpc, type InferOutput } from "../trpc";
import { normalize_symols } from "../util";

type NotNull<T> = T extends null ? never : T;

type Contract = NotNull<InferOutput["contracts"]["list"]>[number];

type ContractCardProps = {
	contract: Contract;
};

const ContractCard: FC<ContractCardProps> = ({ contract }) => {
	return (
		<div
			className="flex flex-col bg-teal-200 rounded-md p-2"
		>
			<p className="text-lg font-semibold mb-2">{normalize_symols(contract.type)}</p>
			<p className="flex flex-row justify-between">
				<span>Acceptar:</span>
				<span className="mr-5">${contract.terms.payment.onAccepted.toLocaleString('no')}</span>
				</p>
			<p className="flex flex-row justify-between">
				<span>Completar:</span>
				<span className="mr-5">${contract.terms.payment.onFulfilled.toLocaleString('no')}</span>
			</p>
			<hr className="my-2 border-slate-600" />
			{
				contract.terms.deliver.map(({unitsRequired, tradeSymbol}) => (
					<p className="flex flex-row justify-between">
						<span>{unitsRequired} {normalize_symols(tradeSymbol)}</span>
					</p>
				))
			}
		</div>
	)
}

const ContractsList = () => {
	const { data:contracts } = trpc.contracts.list.useQuery();
	return (
		<div
			className="flex flex-col bg-slate-200 p-2 rounded-lg w-60"
		>
			<h3
				className="text-2xl text-teal-700 font-semibold"
			>Contratos</h3>
			{
				contracts?.map((contract) => (
					<ContractCard contract={contract} />
				)) 
			}
		</div>
	)
}

export const Dashboard = () => {
	return (
		<div
			className="flex flex-row p-10"
		>
			<ContractsList />
		</div>
	)
}