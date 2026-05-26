import type { MigrationContext, ReversibleMigration } from '../migration-types';

const TABLE_NAME = 'execution_entity';
const FOREIGN_KEY_NAME = 'execution_executedByUserId_foreign';

export class AddExecutedByUserIdToExecution1784000000017 implements ReversibleMigration {
	async up({ schemaBuilder: { addColumns, addForeignKey, column } }: MigrationContext) {
		await addColumns(TABLE_NAME, [
			column('executedByUserId').uuid.comment(
				'ID of the user the execution ran as, used for owner-only data access on private-credential executions',
			),
		]);

		await addForeignKey(
			TABLE_NAME,
			'executedByUserId',
			['user', 'id'],
			FOREIGN_KEY_NAME,
			'SET NULL',
		);
	}

	async down({ schemaBuilder: { dropColumns, dropForeignKey } }: MigrationContext) {
		await dropForeignKey(TABLE_NAME, 'executedByUserId', ['user', 'id'], FOREIGN_KEY_NAME);
		await dropColumns(TABLE_NAME, ['executedByUserId']);
	}
}
