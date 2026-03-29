export type ReservationsProps = {
	id: Number;
	user_id: String;
	property_id: String;
	name: String;
	contact: String;
	deposit: Number;
	amount: Number;
	init_date: Date;
	end_date: Date;
	observations: String;
}

export type CreateReservation = {
	name: String;
	contact: String;
	deposit: Number;
	amount: Number;
	init_date: Date;
	end_date: Date;
	observations: String;
}