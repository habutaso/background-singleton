import { clearInterval } from "timers"

/* singleton pattern */
class Serve {
  private static readonly INTERVAL: number = 500
  private static _instance: Serve
  private static did: string // disaster
  private static tid: string // team
  private static intervalId: NodeJS.Timer | null = null

  private constructor() {
    /* empty */
  }

  /**
   * Serveインスタンスを取得
   */
  static get instance(): Serve {
    if (!Serve._instance) {
      Serve._instance = new Serve()
    }
    return Serve._instance
  }

  /**
   * APIを呼び、位置を送信
   */
  private serve(): void {
    // navigator.geolocation.getCurrentPosition((pos) => {
    //   const loc = [pos.coords.longitude, pos.coords.latitude]
    //   locを送信する
    // })
    console.log("serve", Serve.did, Serve.tid)
  }

  /**
   * serve()の定期実行を開始する　
   * @param did - disaster
   * @param tid - team
   */
  public start(did: string, tid: string): void {
    Serve.did = did
    Serve.tid = tid
    Serve.intervalId = setInterval(this.serve, Serve.INTERVAL)
  }


  /**
   * setIntervalの解除
   * NOTE: ログアウトする際にこの関数を明示的に呼ぶ必要がある
   * インスタンスが破棄されたとしても、setIntervalは別プロセスで動くため
   */
  public clear(): void {
    if (Serve.intervalId) {
      clearInterval(Serve.intervalId)
    }
  }
}

const server = Serve.instance
server.start("a", "b")
setInterval(server.clear, 5000)

