declare module "sql.js" {
  type SqlValue = number | string | Uint8Array | null;
  type BindParams = SqlValue[] | Record<string, SqlValue>;

  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer | null) => Database;
  }

  interface QueryExecResult {
    columns: string[];
    values: SqlValue[][];
  }

  interface Statement {
    bind(params?: BindParams): boolean;
    step(): boolean;
    getAsObject(params?: BindParams): Record<string, SqlValue>;
    free(): boolean;
    reset(): void;
    run(params?: BindParams): void;
  }

  interface Database {
    run(sql: string, params?: BindParams): Database;
    exec(sql: string): QueryExecResult[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }

  export type { Database, QueryExecResult, SqlValue, Statement };

  export default function initSqlJs(config?: {
    locateFile?: (file: string) => string;
  }): Promise<SqlJsStatic>;
}
